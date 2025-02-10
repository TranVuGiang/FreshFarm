<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class PaymentStatus extends Enum
{
    public const  NOT_PAID = 0;
    public const  PAID = 1;
    public const  PAYOFF=2;
}
