<?php

namespace Pickems\Http\Controllers\Api;

use Pickems\Team;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use Pickems\Http\Controllers\Controller;
use Pickems\Transformers\TeamTransformer;
use Dingo\Api\Exception\StoreResourceFailedException;

class TeamsController extends Controller
{
    use Helpers;

    public function list(Request $request)
    {
        $teams = Team::orderBy('teams.name');

        return $this->response->collection($teams->get(), new TeamTransformer(), ['key' => 'teams']);
    }

    public function show(Team $teams)
    {
        return $this->response->collection($teams, new TeamTransformer(), ['key' => 'teams']);
    }

    public function store(Request $request)
    {
        $data = $request->get('data')['attributes'];
        foreach ($request->get('data')['relationships'] as $relationship => $relationshipData) {
            $data[$relationship.'_id'] = $relationshipData['data']['id'];
        }

        $validator = \Validator::make($data, [
            'name' => 'required',
            'slug' => 'required|unique:teams',
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new StoreResourceFailedException('Invalid user data', $validator->errors());
        }

        $team = Team::create($data);

        return $this->response->item($team, new TeamTransformer(), ['key' => 'teams']);
    }
}
