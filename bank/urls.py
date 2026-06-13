from django.urls import path
from .views import (
    ClientListView,
    ClientDetailView,
    ClientAccountsView,
    AccountTransactionsView,
    AnalyticsView
)

urlpatterns = [
    path('clients/', ClientListView.as_view()),
    path('clients/<int:pk>/', ClientDetailView.as_view()),
    path('clients/<int:id>/accounts/', ClientAccountsView.as_view()),
    path('accounts/<int:id>/transactions/', AccountTransactionsView.as_view()),
    path('analytics/', AnalyticsView.as_view()),
]