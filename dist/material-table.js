"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MTableActions", {
  enumerable: true,
  get: function get() {
    return _mTableActions.default;
  }
});
Object.defineProperty(exports, "MTableBody", {
  enumerable: true,
  get: function get() {
    return _mTableBody.default;
  }
});
Object.defineProperty(exports, "MTableBodyRow", {
  enumerable: true,
  get: function get() {
    return _mTableBodyRow.default;
  }
});
Object.defineProperty(exports, "MTableCell", {
  enumerable: true,
  get: function get() {
    return _mTableCell.default;
  }
});
Object.defineProperty(exports, "MTableFilterRow", {
  enumerable: true,
  get: function get() {
    return _mTableFilterRow.default;
  }
});
Object.defineProperty(exports, "MTableHeader", {
  enumerable: true,
  get: function get() {
    return _mTableHeader.default;
  }
});
Object.defineProperty(exports, "MTablePagination", {
  enumerable: true,
  get: function get() {
    return _mTablePagination.default;
  }
});
Object.defineProperty(exports, "MTableToolbar", {
  enumerable: true,
  get: function get() {
    return _mTableToolbar.default;
  }
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@material-ui/core");

var _reactDoubleScrollbar = _interopRequireDefault(require("react-double-scrollbar"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _mTableActions = _interopRequireDefault(require("./m-table-actions"));

var _mTableBody = _interopRequireDefault(require("./m-table-body"));

var _mTableBodyRow = _interopRequireDefault(require("./m-table-body-row"));

var _mTableCell = _interopRequireDefault(require("./m-table-cell"));

var _mTableFilterRow = _interopRequireDefault(require("./m-table-filter-row"));

var _mTableHeader = _interopRequireDefault(require("./m-table-header"));

var _mTablePagination = _interopRequireDefault(require("./m-table-pagination"));

var _mTableToolbar = _interopRequireDefault(require("./m-table-toolbar"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MaterialTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(MaterialTable, _React$Component);

  function MaterialTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MaterialTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MaterialTable).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getRenderData", function (data, props) {
      data = data || _this.state.data;
      props = _this.getProps();
      var renderData = (0, _toConsumableArray2.default)(data); // App filter

      if (_this.state) {
        renderData = renderData.filter(function (row) {
          if (_this.state.filterSelectionChecked) return row.tableData.checked;
          return row.tableData;
        });

        _this.state.columns.filter(function (columnDef) {
          return columnDef.tableData.filterValue;
        }).forEach(function (columnDef) {
          var lookup = columnDef.lookup,
              type = columnDef.type,
              tableData = columnDef.tableData,
              field = columnDef.field;

          if (columnDef.customFilterAndSearch) {
            renderData = renderData.filter(function (row) {
              return !!columnDef.customFilterAndSearch(tableData.filterValue, row, columnDef);
            });
          } else if (lookup) {
            renderData = renderData.filter(function (row) {
              return !tableData.filterValue || tableData.filterValue.length === 0 || tableData.filterValue.indexOf(row[field] && row[field].toString()) > -1;
            });
          } else if (type === 'numeric') {
            renderData = renderData.filter(function (row) {
              return row[field] === tableData.filterValue;
            });
          } else if (type === 'boolean' && tableData.filterValue) {
            renderData = renderData.filter(function (row) {
              return row[field] && tableData.filterValue === 'checked' || !row[field] && tableData.filterValue === 'unchecked';
            });
          } else if (['date', 'datetime'].includes(type)) {
            renderData = renderData.filter(function (row) {
              var currentDate = row[field] ? new Date(row[field]) : null;

              if (currentDate && currentDate.toString() !== 'Invalid Date') {
                var selectedDate = tableData.filterValue;
                var currentDateToCompare = '';
                var selectedDateToCompare = '';

                if (type === 'date') {
                  currentDateToCompare = (0, _format.default)(currentDate, 'MM/dd/yyyy');
                  selectedDateToCompare = (0, _format.default)(selectedDate, 'MM/dd/yyyy');
                } else if (type === 'datetime') {
                  currentDateToCompare = (0, _format.default)(currentDate, 'MM/dd/yyyy - HH:mm');
                  selectedDateToCompare = (0, _format.default)(selectedDate, 'MM/dd/yyyy - HH:mm');
                }

                return currentDateToCompare === selectedDateToCompare;
              }

              return true;
            });
          } else if (type === 'time') {
            renderData = renderData.filter(function (row) {
              var currentHour = row[field] || null;

              if (currentHour) {
                var selectedHour = tableData.filterValue;
                var currentHourToCompare = (0, _format.default)(selectedHour, 'HH:mm');
                return currentHour === currentHourToCompare;
              }

              return true;
            });
          } else {
            renderData = renderData.filter(function (row) {
              return row[field] && row[field].toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
            });
          }
        });
      } // Apply Search


      if (_this.state && _this.state.searchText) {
        renderData = renderData.filter(function (row) {
          return _this.state.columns.filter(function (columnDef) {
            return columnDef.searchable === undefined ? !columnDef.hidden : columnDef.searchable;
          }).some(function (columnDef) {
            if (columnDef.customFilterAndSearch) {
              return !!columnDef.customFilterAndSearch(_this.state.searchText, row, columnDef);
            } else if (columnDef.field) {
              var value = _this.getFieldValue(row, columnDef);

              if (value) {
                return value.toString().toUpperCase().includes(_this.state.searchText.toUpperCase());
              }
            }
          });
        });
      } // Apply Sorting


      if (_this.state && _this.state.orderBy >= 0 && _this.state.orderDirection) {
        var columnDef = _this.state.columns.find(function (_) {
          return _.tableData.id === _this.state.orderBy;
        });

        if (columnDef.customSort) {
          if (_this.state.orderDirection === 'desc') {
            renderData = renderData.sort(function (a, b) {
              return columnDef.customSort(b, a);
            });
          } else {
            renderData = renderData.sort(function (a, b) {
              return columnDef.customSort(a, b);
            });
          }
        } else {
          renderData = renderData.sort(_this.state.orderDirection === 'desc' ? function (a, b) {
            return _this.sort(_this.getFieldValue(b, columnDef), _this.getFieldValue(a, columnDef), columnDef.type);
          } : function (a, b) {
            return _this.sort(_this.getFieldValue(a, columnDef), _this.getFieldValue(b, columnDef), columnDef.type);
          });
        }
      }

      return renderData || data;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getFieldValue", function (rowData, columnDef) {
      var value = typeof rowData[columnDef.field] !== 'undefined' ? rowData[columnDef.field] : _this.byString(rowData, columnDef.field);

      if (columnDef.lookup) {
        value = columnDef.lookup[value];
      }

      return value;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSelectionChange", function () {
      if (_this.props.onSelectionChange) {
        var selectedRows = _this.state.data.filter(function (row) {
          return row.tableData.checked;
        });

        _this.props.onSelectionChange(selectedRows);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangePage", function () {
      var _this$props;

      _this.props.onChangePage && (_this$props = _this.props).onChangePage.apply(_this$props, arguments);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangeRowsPerPage", function () {
      var _this$props2;

      _this.props.onChangeRowsPerPage && (_this$props2 = _this.props).onChangeRowsPerPage.apply(_this$props2, arguments);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onOrderChange", function () {
      var _this$props3;

      _this.props.onOrderChange && (_this$props3 = _this.props).onOrderChange.apply(_this$props3, arguments);
    });

    var calculatedProps = _this.getProps(props);

    var defaultSortColumnIndex = -1;
    var defaultSortDirection = '';

    if (calculatedProps) {
      defaultSortColumnIndex = calculatedProps.columns.findIndex(function (a) {
        return a.defaultSort;
      });
      defaultSortDirection = defaultSortColumnIndex > -1 ? calculatedProps.columns[defaultSortColumnIndex].defaultSort : '';
    }

    _this.state = (0, _objectSpread2.default)({
      columns: [],
      currentPage: 0,
      data: [],
      pageSize: calculatedProps.options.pageSize,
      renderData: [],
      searchText: '',
      selectedCount: 0,
      orderBy: defaultSortColumnIndex,
      orderDirection: defaultSortDirection,
      filterSelectionChecked: false
    }, _this.getData(calculatedProps), _this.getColumns(calculatedProps));
    return _this;
  }

  (0, _createClass2.default)(MaterialTable, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var props = this.getProps(nextProps);
      var columns = this.getColumns(props);
      this.setState((0, _objectSpread2.default)({}, columns), function () {
        var data = _this2.getData(props);

        _this2.setState((0, _objectSpread2.default)({}, data));
      }); // const data = this.getData(props);
      // this.setState(() => ({ ...columns, ...data }));
    }
  }, {
    key: "getData",
    value: function getData(props) {
      var selectedCount = 0;
      var data = props.data.map(function (row, index) {
        row.tableData = (0, _objectSpread2.default)({}, row.tableData, {
          id: index
        });

        if (row.tableData.checked) {
          selectedCount++;
        }

        return row;
      });
      var renderData = this.getRenderData(data, props);
      return {
        data: data,
        renderData: renderData,
        selectedCount: selectedCount
      };
    }
  }, {
    key: "getColumns",
    value: function getColumns(props) {
      var columns = props.columns.map(function (columnDef, index) {
        columnDef.tableData = (0, _objectSpread2.default)({
          filterValue: columnDef.defaultFilter
        }, columnDef.tableData, {
          id: index
        });
        return columnDef;
      });
      return {
        columns: columns
      };
    }
  }, {
    key: "getProps",
    value: function getProps(props) {
      var calculatedProps = (0, _objectSpread2.default)({}, props || this.props);
      calculatedProps.components = (0, _objectSpread2.default)({}, MaterialTable.defaultProps.components, calculatedProps.components);
      calculatedProps.icons = (0, _objectSpread2.default)({}, MaterialTable.defaultProps.icons, calculatedProps.icons);
      calculatedProps.options = (0, _objectSpread2.default)({}, MaterialTable.defaultProps.options, calculatedProps.options);
      return calculatedProps;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      data = data || this.state.data;
      var renderData = this.getRenderData(data);
      this.setState({
        data: data,
        renderData: renderData
      });
    }
  }, {
    key: "byString",
    value: function byString(o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

      s = s.replace(/^\./, ''); // strip a leading dot

      var a = s.split('.');

      for (var i = 0, n = a.length; i < n; ++i) {
        var x = a[i];

        if (x in o) {
          o = o[x];
        } else {
          return;
        }
      }

      return o;
    }
  }, {
    key: "sort",
    value: function sort(a, b, type) {
      if (type === 'numeric') {
        return a - b;
      } else {
        return a < b ? -1 : a > b ? 1 : 0;
      }
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this3 = this;

      var props = this.getProps();

      if (props.options.paging) {
        var localization = (0, _objectSpread2.default)({}, MaterialTable.defaultProps.localization.pagination, this.props.localization.pagination);
        return React.createElement(_core.Table, null, React.createElement(_core.TableFooter, {
          style: {
            display: 'grid'
          }
        }, React.createElement(_core.TableRow, null, React.createElement(props.components.Pagination, {
          style: {
            float: 'right'
          },
          colSpan: 3,
          count: this.state.renderData.length,
          rowsPerPage: this.state.pageSize,
          rowsPerPageOptions: props.options.pageSizeOptions,
          page: this.state.currentPage,
          onChangePage: function onChangePage(event, page) {
            _this3.setState({
              currentPage: page
            }, function () {
              _this3.setData();

              _this3.onChangePage(page);
            });
          },
          onChangeRowsPerPage: function onChangeRowsPerPage(event) {
            _this3.setState(function (state) {
              state.pageSize = event.target.value;
              state.currentPage = 0;
              return state;
            }, function () {
              _this3.setData();

              _this3.onChangeRowsPerPage(event.target.value);
            });
          },
          ActionsComponent: function ActionsComponent(subProps) {
            return React.createElement(_mTablePagination.default, (0, _extends2.default)({}, subProps, {
              icons: props.icons,
              localization: localization
            }));
          },
          labelDisplayedRows: function labelDisplayedRows(row) {
            return localization.labelDisplayedRows.replace('{from}', row.from).replace('{to}', row.to).replace('{count}', row.count);
          },
          labelRowsPerPage: localization.labelRowsPerPage
        }))));
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var props = this.getProps();
      return React.createElement(props.components.Container, {
        style: {
          position: 'relative'
        }
      }, props.options.toolbar && React.createElement(props.components.Toolbar, {
        actions: props.actions,
        components: props.components,
        selectedRows: this.state.selectedCount > 0 ? this.state.data.filter(function (a) {
          return a.tableData.checked;
        }) : [],
        columns: this.state.columns,
        columnsButton: props.options.columnsButton,
        icons: props.icons,
        exportButton: props.options.exportButton,
        exportDelimiter: props.options.exportDelimiter,
        renderData: this.state.renderData,
        search: props.options.search,
        searchText: this.state.searchText,
        searchFieldStyle: props.options.searchFieldStyle,
        title: props.title,
        onSearchChanged: function onSearchChanged(searchText) {
          return _this4.setState({
            searchText: searchText
          }, function () {
            return _this4.setData();
          });
        },
        onColumnsChanged: function onColumnsChanged(columns) {
          return _this4.setState({
            columns: columns
          });
        },
        localization: (0, _objectSpread2.default)({}, MaterialTable.defaultProps.localization.toolbar, this.props.localization.toolbar)
      }), React.createElement(ScrollBar, {
        double: props.options.doubleHorizontalScroll
      }, React.createElement(_core.Table, null, props.options.header && React.createElement(props.components.Header, {
        localization: (0, _objectSpread2.default)({}, MaterialTable.defaultProps.localization.header, this.props.localization.header),
        columns: this.state.columns,
        hasSelection: props.options.selection,
        headerStyle: props.options.headerStyle,
        selectedCount: this.state.selectedCount,
        dataCount: this.state.data.length,
        hasDetailPanel: !!props.detailPanel,
        showActionsColumn: props.actions && props.actions.filter(function (a) {
          return !a.isFreeAction && !_this4.props.options.selection;
        }).length > 0,
        orderBy: this.state.orderBy,
        orderDirection: this.state.orderDirection,
        onAllSelected: function onAllSelected(checked) {
          var data = _this4.state.renderData.map(function (row) {
            row.tableData.checked = checked;
            return row;
          });

          var selectedCount = checked ? data.length : 0;

          _this4.setState({
            renderData: data,
            selectedCount: selectedCount
          }, function () {
            return _this4.onSelectionChange();
          });
        },
        onOrderChange: function onOrderChange(orderBy, orderDirection) {
          _this4.setState({
            orderBy: orderBy,
            orderDirection: orderDirection,
            currentPage: 0
          }, function () {
            _this4.setData();

            _this4.onOrderChange(orderBy, orderDirection);
          });
        },
        actionsHeaderIndex: props.options.actionsColumnIndex,
        sorting: props.options.sorting
      }), React.createElement(props.components.Body, {
        actions: props.actions,
        components: props.components,
        icons: props.icons,
        renderData: this.state.renderData,
        currentPage: this.state.currentPage,
        pageSize: this.state.pageSize,
        columns: this.state.columns,
        detailPanel: props.detailPanel,
        options: props.options,
        getFieldValue: this.getFieldValue,
        onFilterChanged: function onFilterChanged(columnId, value) {
          var columns = _this4.state.columns;
          columns[columnId].tableData.filterValue = value;

          _this4.setState({
            columns: columns
          }, function () {
            _this4.setData();
          });
        },
        onFilterSelectionChanged: function onFilterSelectionChanged(event) {
          var filterSelectionChecked = event.target.checked;
          var columns = _this4.state.columns;

          _this4.setState({
            columns: columns,
            filterSelectionChecked: filterSelectionChecked
          }, function () {
            _this4.setData();
          });
        },
        onRowSelected: function onRowSelected(event, checked) {
          var data = _this4.state.data;
          data[event.target.value].tableData.checked = checked;

          _this4.setState(function (state) {
            return {
              data: data,
              selectedCount: state.selectedCount + (checked ? 1 : -1)
            };
          }, function () {
            return _this4.onSelectionChange();
          });

          _this4.setData();
        },
        onToggleDetailPanel: function onToggleDetailPanel(rowData, render) {
          var data = _this4.state.data;
          var targetRow = data.find(function (a) {
            return a.tableData.id === rowData.tableData.id;
          });

          if (targetRow.tableData.showDetailPanel === render) {
            targetRow.tableData.showDetailPanel = undefined;
          } else {
            targetRow.tableData.showDetailPanel = render;
          }

          _this4.setData(data);
        },
        localization: (0, _objectSpread2.default)({}, MaterialTable.defaultProps.localization.body, this.props.localization.body),
        onRowClick: this.props.onRowClick
      }))), props.isLoading && props.options.loadingType === "linear" && React.createElement("div", {
        style: {
          position: 'relative',
          width: '100%'
        }
      }, React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }
      }, React.createElement(_core.LinearProgress, null))), this.renderFooter(), props.isLoading && props.options.loadingType === 'overlay' && React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }
      }, React.createElement("div", {
        style: {
          display: 'table',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFFAA'
        }
      }, React.createElement("div", {
        style: {
          display: 'table-cell',
          width: '100%',
          height: '100%',
          verticalAlign: 'middle',
          textAlign: 'center'
        }
      }, React.createElement(_core.CircularProgress, null)))));
    }
  }]);
  return MaterialTable;
}(React.Component);

var ScrollBar = function ScrollBar(_ref) {
  var double = _ref.double,
      children = _ref.children;

  if (double) {
    return React.createElement(_reactDoubleScrollbar.default, null, children);
  } else {
    return React.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, children);
  }
};

MaterialTable.defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: {
    Actions: _mTableActions.default,
    Body: _mTableBody.default,
    Cell: _mTableCell.default,
    Container: _core.Paper,
    FilterRow: _mTableFilterRow.default,
    Header: _mTableHeader.default,
    Pagination: _core.TablePagination,
    Row: _mTableBodyRow.default,
    Toolbar: _mTableToolbar.default
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Check: function Check(props) {
      return React.createElement(_core.Icon, props, "check");
    },
    DetailPanel: function DetailPanel(props) {
      return React.createElement(_core.Icon, props, "chevron_right");
    },
    Export: function Export(props) {
      return React.createElement(_core.Icon, props, "save_alt");
    },
    Filter: function Filter(props) {
      return React.createElement(_core.Icon, props, "filter_list");
    },
    FirstPage: function FirstPage(props) {
      return React.createElement(_core.Icon, props, "first_page");
    },
    LastPage: function LastPage(props) {
      return React.createElement(_core.Icon, props, "last_page");
    },
    NextPage: function NextPage(props) {
      return React.createElement(_core.Icon, props, "chevron_right");
    },
    PreviousPage: function PreviousPage(props) {
      return React.createElement(_core.Icon, props, "chevron_left");
    },
    Search: function Search(props) {
      return React.createElement(_core.Icon, props, "search");
    },
    ThirdStateCheck: function ThirdStateCheck(props) {
      return React.createElement(_core.Icon, props, "remove");
    },
    ViewColumn: function ViewColumn(props) {
      return React.createElement(_core.Icon, props, "view_column");
    }
    /* eslint-enable react/display-name */

  },
  isLoading: false,
  title: 'Table Title',
  options: {
    actionsColumnIndex: 0,
    columnsButton: false,
    doubleHorizontalScroll: false,
    emptyRowsWhenPaging: true,
    exportButton: false,
    exportDelimiter: ',',
    filtering: false,
    header: true,
    loadingType: 'overlay',
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    showEmptyDataSourceMessage: true,
    search: true,
    searchFieldStyle: {},
    selection: false,
    sorting: true,
    toolbar: true
  },
  localization: {
    pagination: {
      labelDisplayedRows: '{from}-{to} of {count}',
      labelRowsPerPage: 'Rows per page:'
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {}
    }
  }
};
MaterialTable.propTypes = {
  actions: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    icon: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func, _propTypes.default.string]).isRequired,
    isFreeAction: _propTypes.default.bool,
    tooltip: _propTypes.default.string,
    onClick: _propTypes.default.func.isRequired,
    iconProps: _propTypes.default.object
  })])),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    cellStyle: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
    currencySetting: _propTypes.default.shape({
      locale: _propTypes.default.string,
      currencyCode: _propTypes.default.string,
      minimumFractionDigits: _propTypes.default.number,
      maximumFractionDigits: _propTypes.default.number
    }),
    customFilterAndSearch: _propTypes.default.func,
    customSort: _propTypes.default.func,
    defaultFilter: _propTypes.default.any,
    defaultSort: _propTypes.default.oneOf(['asc', 'desc']),
    emptyValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.func]),
    field: _propTypes.default.string,
    filtering: _propTypes.default.bool,
    headerStyle: _propTypes.default.object,
    hidden: _propTypes.default.bool,
    lookup: _propTypes.default.object,
    render: _propTypes.default.func,
    searchable: _propTypes.default.bool,
    sorting: _propTypes.default.bool,
    title: _propTypes.default.string.isRequired,
    type: _propTypes.default.oneOf(['string', 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'])
  })).isRequired,
  components: _propTypes.default.shape({
    Actions: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Body: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Cell: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Container: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    FilterRow: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Header: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Pagination: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Row: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Toolbar: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func])
  }),
  data: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  detailPanel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.arrayOf(_propTypes.default.shape({
    icon: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func, _propTypes.default.string]),
    openIcon: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func, _propTypes.default.string]),
    tooltip: _propTypes.default.string,
    render: _propTypes.default.func.isRequired
  }))]),
  icons: _propTypes.default.shape({
    Check: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    DetailPanel: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Export: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Filter: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    FirstPage: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    LastPage: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    NextPage: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    PreviousPage: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    Search: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    ThirdStateCheck: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    ViewColumn: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func])
  }),
  isLoading: _propTypes.default.bool,
  title: _propTypes.default.string,
  options: _propTypes.default.shape({
    actionsColumnIndex: _propTypes.default.number,
    columnsButton: _propTypes.default.bool,
    doubleHorizontalScroll: _propTypes.default.bool,
    emptyRowsWhenPaging: _propTypes.default.bool,
    exportButton: _propTypes.default.bool,
    exportDelimiter: _propTypes.default.string,
    filtering: _propTypes.default.bool,
    header: _propTypes.default.bool,
    headerStyle: _propTypes.default.object,
    loadingType: _propTypes.default.oneOf(['overlay', 'linear']),
    paging: _propTypes.default.bool,
    pageSize: _propTypes.default.number,
    pageSizeOptions: _propTypes.default.arrayOf(_propTypes.default.number),
    rowStyle: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
    showEmptyDataSourceMessage: _propTypes.default.bool,
    search: _propTypes.default.bool,
    searchFieldStyle: _propTypes.default.object,
    selection: _propTypes.default.bool,
    sorting: _propTypes.default.bool,
    toolbar: _propTypes.default.bool
  }),
  localization: _propTypes.default.shape({
    pagination: _propTypes.default.object,
    toolbar: _propTypes.default.object,
    header: _propTypes.default.object,
    body: _propTypes.default.object
  }),
  onSelectionChange: _propTypes.default.func,
  onChangeRowsPerPage: _propTypes.default.func,
  onChangePage: _propTypes.default.func,
  onOrderChange: _propTypes.default.func,
  onRowClick: _propTypes.default.func
};
var _default = MaterialTable;
exports.default = _default;