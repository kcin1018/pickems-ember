<?php

namespace app\Http\Controllers\Api;

use App\User;
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Dingo\Api\Exception\StoreResourceFailedException;

class UsersController extends Controller
{
    use Helpers;

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
