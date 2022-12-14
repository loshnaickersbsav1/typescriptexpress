export interface BusinessCapabilities {
  values: [
    {
      id?: string;
      name?: string;
      level?: string;
      children?: [
        {
          id?: string;
          name?: string;
          level?: string;
          children?: [
            {
              id?: string;
              name?: string;
              level?: string;
              children?: [
                {
                  id?: string;
                  name?: string;
                  level?: string;
                },
              ];
            },
          ];
        },
      ];
    },
  ];
}
