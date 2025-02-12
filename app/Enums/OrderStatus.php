<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class OrderStatus extends Enum
{
    public const  ORDER = 0;

    public const  PACK = 1;
    public const  TRANSPORT = 2;
    public const  RECEIVE = 3;
    public const  DESTROY = 4;
}
