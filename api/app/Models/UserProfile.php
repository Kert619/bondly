<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $user_id
 * @property string $name
 * @property string|null $birth_date
 * @property string|null $gender
 * @property string|null $relationship_status
 * @property string|null $address
 * @property string|null $postal_code
 * @property string|null $occupation
 * @property string|null $company_name
 * @property string|null $school
 * @property string|null $profile_photo
 * @property string|null $cover_photo
 * @property string|null $bio
 * @property string $mood
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereCoverPhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereMood($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereOccupation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereProfilePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereRelationshipStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereUserId($value)
 * @mixin \Eloquent
 */
class UserProfile extends Model
{
    protected $guarded = [];
}
