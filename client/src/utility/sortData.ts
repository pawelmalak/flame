interface Data {
  name: string;
  orderId: number;
  createdAt: Date;
}

export const sortData = <T extends Data>(array: T[], field: string): T[] => {
  const sortedData = array.slice();

  if (field === 'name') {
    sortedData.sort((a: T, b: T) => {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    })
  } else if (field === 'orderId') {
    sortedData.sort((a: T, b: T) => {
      if (a.orderId < b.orderId) { return -1 }
      if (a.orderId > b.orderId) { return 1 }
      return 0;
    })
  } else {
    sortedData.sort((a: T, b: T) => {
      if (a.createdAt < b.createdAt) { return -1 }
      if (a.createdAt > b.createdAt) { return 1 }
      return 0;
    })
  }

  return sortedData;
}