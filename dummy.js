export default {
  data: [{
    id: 1,
    no: 1,
    keyword: 'test 1',
    clicks: 24.98,
    fcp: 2,
    si: 2.48,
    lcp: 3.45,
    tti: 1.25,
    tbt: 3.56,
    cls: 2.15
  },
  {
    id: 2,
    no: 2,
    keyword: 'test 2',
    clicks: 24.98,
    fcp: 2,
    si: 2.48,
    lcp: 3.45,
    tti: 1.25,
    tbt: 3.56,
    cls: 2.15
  },
  {
    id: 2,
    no: 2,
    keyword: 'test 3',
    clicks: 24.98,
    fcp: 2,
    si: 2.48,
    lcp: 3.45,
    tti: 1.25,
    tbt: 3.56,
    cls: 2.15
  },
  {
    id: 3,
    no: 3,
    keyword: 'test 4',
    clicks: 24.98,
    fcp: 2,
    si: 2.48,
    lcp: 3.45,
    tti: 1.25,
    tbt: 3.56,
    cls: 2.15
  }, {
    omit: true,
    summary: {
      clicks: 99.99,
      fcp: 2,
      si: 2.48,
      lcp: 3.45,
      tti: 1.25,
      tbt: 3.56,
      cls: 2.15
    }
  }],
  columns: [{
    text: 'No',
    dataIndex: 'no',
    locked: true,
    disallowSort: true,
    listeners: {
      click: (self, rowData) => {
        alert(`You are clicked to '${self.text}' column.\n\n rowData: ${JSON.stringify(rowData)}`)
      },
      dblclick: (self, rowData) => {
        console.log({ dblclick_self: self })
        console.log({ dblclick_rowData: rowData })
      },
      mouseenter: (self, rowData) => {
        console.log({ mouseenter_self: self })
        console.log({ mouseenter_rowData: rowData })
      },
      mouseleave: (self, rowData) => {
        console.log({ mouseleave_self: self })
        console.log({ mouseleave_rowData: rowData })
      }
    }
  }, {
    text: 'Keyword',
    locked: true,
    lastLocked: true,
    dataIndex: 'keyword',
    showTotal: true,
    customStyles: {
      data: {
        'max-width': '200px',
        'min-width': '200px',
        'font-weight': 600,
        color: '#649DD1'
      }
    }
  }, {
    text: 'Clicks',
    dataIndex: 'clicks',
    customStyles: {
      header: {
        'background-color': '#E1EDF9'
      }
    }
  }, {
    text: 'Impressions',
    dataIndex: 'impressions',
    customStyles: {
      header: {
        'background-color': '#E1EDF9'
      }
    }
  }, {
    text: 'CTR',
    dataIndex: 'ctr',
    customStyles: {
      header: {
        'background-color': '#C5DFB9'
      }
    }
  }, {
    text: 'Position',
    dataIndex: 'position',
    customStyles: {
      header: {
        'background-color': '#C5DFB9'
      }
    }
  }, {
    text: 'si',
    dataIndex: 'si',
    customStyles: {
      header: {
        'background-color': '#EFB1B1'
      }
    }
  }, {
    text: 'Position2',
    dataIndex: 'position2',
    customStyles: {
      header: {
        'background-color': '#EFB1B1'
      }
    }
  }, {
    text: 'FCP',
    dataIndex: 'fcp'
  }, {
    text: 'LCP',
    dataIndex: 'lcp'
  }, {
    text: 'Page8',
    dataIndex: 'si'
  }, {
    text: 'Page9',
    dataIndex: 'si'
  }, {
    text: 'Page10',
    dataIndex: 'si'
  }, {
    text: 'Page11',
    dataIndex: 'si'
  }, {
    text: 'Page12',
    dataIndex: 'si'
  }, {
    text: 'Page13',
    dataIndex: 'si'
  }, {
    text: 'Page14',
    dataIndex: 'si'
  }, {
    text: 'Page15',
    dataIndex: 'si'
  }, {
    text: 'Page16',
    dataIndex: 'si'
  }, {
    text: 'Page17',
    dataIndex: 'si'
  }, {
    text: 'Page18',
    dataIndex: 'si'
  }]
}
