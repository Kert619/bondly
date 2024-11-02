<?php

use App\Enums\GenderEnum;
use App\Enums\MoodEnum;
use App\Enums\RelationshipStatusEnum;
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
            $table->foreignId('user_id')->constrained();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date');
            $table->enum('gender', [GenderEnum::MALE->value, GenderEnum::FEMALE->value])->nullable();
            $table->enum('relationship_status', [RelationshipStatusEnum::SINGLE->value, RelationshipStatusEnum::MARRIED->value, RelationshipStatusEnum::WIDOWED->value, RelationshipStatusEnum::SPOUSE->value])->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('postal_code')->nullable();
            $table->string('occupation')->nullable();
            $table->string('company_name')->nullable();
            $table->string('school')->nullable();
            $table->text('profile_photo')->nullable();
            $table->text('cover_photo')->nullable();
            $table->string('bio', 500)->nullable();
            $table->enum('mood', [MoodEnum::ALL->value, MoodEnum::HAPPY->value, MoodEnum::AMUSED->value, MoodEnum::LOVE->value, MoodEnum::ANGRY->value, MoodEnum::SAD->value])->default(MoodEnum::ALL->value);
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
