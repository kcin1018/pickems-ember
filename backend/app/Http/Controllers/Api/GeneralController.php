<?php

namespace Pickems\Http\Controllers\Api;

use Dingo\Api\Routing\Helpers;
use Pickems\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;

class GeneralController extends Controller
{
    use Helpers;

    public function homeStats()
    {
        return $this->response->array([
            'teams' => 10,
            'paid' => 7,
            'owners' => 10,
            'money' => 7 * Config::get('pickems.cost'),
        ]);
    }
}
