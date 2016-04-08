<?php

namespace Pickems\Transformers;

use Pickems\User;
use League\Fractal;

class UserTransformer extends Fractal\TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'id' => (int) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is-admin' => (bool) $user->is_admin,
        ];
    }
}
