<?php

namespace App\Enums;

enum RelationshipStatusEnum: string {
    case SINGLE = "single";
    case MARRIED = "married";
    case WIDOWED = "widowed";
    case SPOUSE = "spouse";
}