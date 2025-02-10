<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class PaymentMethodStatus extends Enum
{
    public const  CASH = 0;
    public const  TRANSFER = 1;
}
