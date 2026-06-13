from rest_framework import generics
from .models import Client, Account, Transaction
from .serializers import ClientSerializer, AccountSerializer, TransactionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
# GET /api/clients
class ClientListView(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


# GET /api/clients/<id>
class ClientDetailView(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


# GET /api/clients/<id>/accounts
class ClientAccountsView(generics.ListAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        return Account.objects.filter(client_id=self.kwargs['id'])


# GET /api/accounts/<id>/transactions
class AccountTransactionsView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(account_id=self.kwargs['id'])

class AnalyticsView(APIView):
    def get(self, request):
        return Response({
            "clients_count": Client.objects.count(),
            "accounts_count": Account.objects.count(),
            "transactions_count": Transaction.objects.count(),
            "total_balance": Account.objects.aggregate(
                total=Sum("balance")
            )["total"] or 0
        })