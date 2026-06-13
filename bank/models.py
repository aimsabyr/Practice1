from django.db import models


class Client(models.Model):
    full_name = models.CharField(max_length=255)
    iin = models.CharField(max_length=12)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Account(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10)

    def __str__(self):
        return self.account_number


class Transaction(models.Model):
    OPERATION_TYPES = [
        ('CREDIT', 'Пополнение'),
        ('DEBIT', 'Списание'),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    operation_type = models.CharField(max_length=10, choices=OPERATION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.operation_type} - {self.amount}"