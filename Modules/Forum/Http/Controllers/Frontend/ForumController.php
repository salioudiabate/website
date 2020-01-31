<?php

namespace Modules\Forum\Http\Controllers\Frontend;

use Illuminate\Routing\Controller;
use Inertia\Inertia;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('forum/index');
    }

    /**
     * Display a channel view
     *
     * @param  string $slug
     * @return \Inertia\Response
     */
    public function channel(string $slug)
    {
        $channel = [];

        return Inertia::render('forum/channel', compact('channel'));
    }

    /**
     * Display a topic
     *
     * @param  string $slug
     * @return \Inertia\Response
     */
    public function topic(string $slug)
    {
        $topic = [];

        return Inertia::render('forum/topic', compact('topic'));
    }
}