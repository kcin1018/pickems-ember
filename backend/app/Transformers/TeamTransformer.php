<?php

namespace Pickems\Transformers;

use Pickems\Team;
use League\Fractal;

class TeamTransformer extends Fractal\TransformerAbstract
{
    protected $defaultIncludes = [
        'user',
    ];

    public function transform(Team $team)
    {
        return [
            'id' => (int) $team->id,
            'name' => $team->name,
            'slug' => $team->slug,
            'paid' => (bool) $team->paid,
            'reg-points' => mt_rand(1, 500),
            'reg-ranking' => 'Silver #'.mt_rand(1, 25),
            'post-points' => mt_rand(1, 500),
            'post-ranking' => 'Gold #'.mt_rand(1, 25),
        ];
    }

    public function includeUser(Team $team)
    {
        return $this->item($team->user, new UserTransformer(), 'users');
    }
}
