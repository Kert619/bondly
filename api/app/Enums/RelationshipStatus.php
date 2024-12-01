<?php

namespace App\Enums;

enum RelationshipStatus: string
{
    case SINGLE = "single";
    case ENGAGED = 'engaged';
    case DATING = 'dating';
    case MARRIED = "married";
    case WIDOWED = "widowed";
    case SEPERATED = "seperated";
    case DIVORCED = 'divorced';
}
