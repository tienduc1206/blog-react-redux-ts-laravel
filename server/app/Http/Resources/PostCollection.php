<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{
    private $statusText;
    private $statusCode;

    public function __construct($resource, $statusCode = 200, $statusText = "success")
    {
        parent::__construct($resource);
        $this->statusText = $statusText;
        $this->statusCode = $statusCode;
    }
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'data' => $this->collection,
            'status' => $this->statusCode,
            'statusText' => $this->statusText
        ];
    }
}
