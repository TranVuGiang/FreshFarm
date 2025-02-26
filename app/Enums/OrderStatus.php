<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class OrderStatus extends Enum
{
    public const  ORDER = 0;
    public const  CONFIRM=1;
    public const  PACK = 2;
    public const  TRANSPORT = 3;
    public const  RECEIVE = 4;
    public const  DESTROY = 5;
}
