<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

abstract class Controller
{
    protected static string $model;
    private Model $modelInstance;
    protected static $primaryKey = 'id';
    protected static $with = [];
    protected static $indexColumns = [];

    public function storeValidations(): ?FormRequest
    {
        return null;
    }
    public function updateValidations(): ?FormRequest
    {
        return null;
    }

    public function __construct()
    {
        $this->modelInstance =  new static::$model;
    }

    public function index() {}

    public function show(string $id)
    {
        $model = $this->modelInstance->with(static::$with)->where(static::$primaryKey, $id)->select(static::$indexColumns)->firstOrFail();
        return $model;
    }

    public function store()
    {
        $request = $this->storeValidations();
        $validated = $request ? $request->validated() : request()->all();
        $model = $this->modelInstance->create($validated);
        return $model;
    }

    public function update(string $id)
    {
        $model = $this->modelInstance->query()->findOrFail($id);
        $request = $this->updateValidations();
        $validated = $request ? $request->validated() : request()->all();
        $model->update($validated);
        return $model;
    }

    public function destroy(string $id)
    {
        $model = $this->modelInstance->query()->findOrFail($id);
        $model->delete();

        return response()->noContent();
    }
}
