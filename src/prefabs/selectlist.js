(() => ({
    name: 'Organogram List',
    icon: 'RowColumnIcon',
    category: 'LAYOUT',
    keywords: ['Layout', 'column', 'columns', '1'],
    structure: [
      {
        name: 'selectlist',
        options: [
          {
            value: '',
            type: 'MODEL',
            label: 'Model',
            key: 'model',
          },
          {
            type: 'FILTER',
            label: 'Filter',
            key: 'filter',
            value: {},
            configuration: {
              dependsOn: 'model',
            },
          },
        ],
        descendants: [],
      },
    ],
  }))();
  