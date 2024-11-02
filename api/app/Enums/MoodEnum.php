<?php

namespace App\Enums;

enum MoodEnum: string {
    case ALL = "all";
    case HAPPY = "happy";
    case AMUSED = "amused";
    case LOVE = "love";
    case SAD = "sad";
    case ANGRY = "angry";
}