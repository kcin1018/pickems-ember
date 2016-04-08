<?php

namespace Pickems\Http\Controllers\Api;

use Pickems\User;
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;
use Pickems\Http\Controllers\Controller;
use Pickems\Transformers\UserTransformer;
use Dingo\Api\Exception\StoreResourceFailedException;

class UsersController extends Controller
{
    use Helpers;

    public function list()
    {
        return $this->response->collection(User::all(), new UserTransformer(), ['key' => 'users']);
    }

    public function show(User $users)
    {
        return $this->response->item($users, new UserTransformer(), ['key' => 'users']);
    }

    public function store(Request $request)
    {
        $data = $request->get('data')['attributes'];

        $validator = \Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            throw new StoreResourceFailedException('Invalid user data', $validator->errors());
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return $this->response->item($user, new UserTransformer(), ['key' => 'users']);
    }
}
