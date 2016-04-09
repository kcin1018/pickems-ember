<?php

namespace Pickems\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

class Controller extends BaseController
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    public function fetchData(Request $request)
    {
        $data = $request->get('data')['attributes'];
        foreach ($request->get('data')['relationships'] as $relationship => $relationshipData) {
            $data[$relationship.'_id'] = $relationshipData['data']['id'];
        }

        return $data;
    }
}
