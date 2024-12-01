<?php

use App\Enums\Gender;
use App\Enums\Mood;
use App\Enums\RelationshipStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date');
            $table->enum('gender', array_map(fn($case) => $case->value, Gender::cases()))->nullable();
            $table->enum('relationship_status', array_map(fn($case) => $case->value, RelationshipStatus::cases()))->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('postal_code')->nullable();
            $table->string('occupation')->nullable();
            $table->string('company_name')->nullable();
            $table->string('school')->nullable();
            $table->text('profile_photo', 2048)->nullable();
            $table->text('cover_photo', 2048)->nullable();
            $table->string('bio', 500)->nullable();
            $table->enum('mood', array_map(fn($case) => $case->value, Mood::cases()));
            $table->boolean('profile_completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
