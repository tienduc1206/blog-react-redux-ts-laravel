<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollection;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        if ($posts->count()) {
            $statusCode = 200;
            $statusText = "success";
        } else {
            $statusCode = 204;
            $statusText = "No data";
        }
        return new PostCollection($posts, $statusCode, $statusText);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostCreateRequest $request)
    {
        $dataCreate = $request->all();
        $post = Post::create($dataCreate);
        if ($post) {
            $statusCode = 201;
            $statusText = "success";
        } else {
            $statusCode = 500;
            $statusText = "server error";
        }
        return response()->json([
            'data' => $post,
            'status' => $statusCode,
            'statusText' => $statusText
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostCreateRequest $request, Post $post)
    {
        $status = $post->update($request->all());
        if ($status) {
            $statusCode = 200;
            $statusText = 'success';
        } else {
            $statusCode = 500;
            $statusText = 'server error';
        }
        return response()->json([
            'data' => $post,
            'status' => $statusCode,
            'statusText' => $statusText
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $status = $post->delete();
        if ($status) {
            $statusCode = 200;
            $statusText = 'success';
        } else {
            $statusCode = 500;
            $statusText = 'server error';
        }
        return response()->json([
            'data' => $post,
            'status' => $statusCode,
            'statusText' => $statusText
        ]);
    }
}
