export function isValidDatabaseTable(tableName: string): boolean {
  const validTables: string[] = [
    'users',
    'products',
    'roles',
    'warehouses',
    'warehouses_products',
    'financial_transactions',
    'payment_methods',
    'sellers',
    'clients',
    'productions',
    'productions_steps',
    'alerts',
    'productions_responsibilities',
  ];
  return validTables.includes(tableName);
}
