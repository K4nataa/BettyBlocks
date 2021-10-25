(() => ({
  name: 'Organogram',
  icon: 'RowColumnIcon',
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
  structure: [
    {
      name: 'Organogram',
      options: [
        {
          value: '',
          type: 'MODEL',
          label: 'Model',
          key: 'team',
        },
        {
          type: 'FILTER',
          label: 'Filter',
          key: 'filter',
          value: {},
          configuration: {
            dependsOn: 'team',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
