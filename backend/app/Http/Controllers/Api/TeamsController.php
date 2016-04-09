<?php

namespace Pickems\Http\Controllers\Api;

use Pickems\Team;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use Illuminate\Support\Facades\Auth;
use Pickems\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Pickems\Transformers\TeamTransformer;
use Dingo\Api\Exception\StoreResourceFailedException;

class TeamsController extends Controller
{
    use Helpers;

    public function list(Request $request)
    {
        $teams = Team::orderBy('teams.name');

        // limit by the users' teams if they are not an admin
        $user = Auth::user();
        if (!$user->is_admin) {
            $teams->where('user_id', '=', $user->id);
        }

        return $this->response->collection($teams->get(), new TeamTransformer(), ['key' => 'teams']);
    }

    public function show(Team $teams)
    {
        return $this->response->collection($teams, new TeamTransformer(), ['key' => 'teams']);
    }

    public function store(Request $request)
    {
        $data = $this->fetchData($request);
        $this->validateData($data);

        $team = Team::create($data);

        return $this->response->item($team, new TeamTransformer(), ['key' => 'teams']);
    }

    public function update(Request $request, Team $teams)
    {
        $data = $this->fetchData($request);
        $this->validateData($data);

        $teams->update($data);

        return $this->response->item($teams, new TeamTransformer(), ['key' => 'teams']);
    }

    public function destroy(Team $teams)
    {
        $teams->delete();

        return $this->response->noContent();
    }

    private function validateData($data)
    {
        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => 'required|unique:teams',
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new StoreResourceFailedException('Invalid user data', $validator->errors());
        }
    }
}
