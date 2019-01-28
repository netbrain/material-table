"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableBody =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(MTableBody, _React$Component);

  function MTableBody() {
    (0, _classCallCheck2.default)(this, MTableBody);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MTableBody).apply(this, arguments));
  }

  (0, _createClass2.default)(MTableBody, [{
    key: "renderEmpty",
    value: function renderEmpty(emptyRowCount, renderData) {
      var _this = this;

      var localization = (0, _objectSpread2.default)({}, MTableBody.defaultProps.localization, this.props.localization);

      if (this.props.options.showEmptyDataSourceMessage && renderData.length === 0) {
        var addColumn = 0;

        if (this.props.options.selection || this.props.actions && this.props.actions.filter(function (a) {
          return !a.isFreeAction && !_this.props.options.selection;
        }).length > 0) {
          addColumn = 1;
        }

        return React.createElement(_core.TableRow, {
          style: {
            height: 49 * (this.props.options.paging && this.props.options.emptyRowsWhenPaging ? this.props.pageSize : 1)
          },
          key: 'empty-' + 0
        }, React.createElement(_core.TableCell, {
          style: {
            paddingTop: 0,
            paddingBottom: 0,
            textAlign: 'center'
          },
          colSpan: this.props.columns.length + addColumn,
          key: "empty-"
        }, localization.emptyDataSourceMessage));
      } else if (this.props.options.emptyRowsWhenPaging) {
        return React.createElement(React.Fragment, null, (0, _toConsumableArray2.default)(Array(emptyRowCount)).map(function (r, index) {
          return React.createElement(_core.TableRow, {
            style: {
              height: 49
            },
            key: 'empty-' + index
          });
        }), emptyRowCount > 0 && React.createElement(_core.TableRow, {
          style: {
            height: 1
          },
          key: 'empty-last1'
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var renderData = this.props.renderData;
      var emptyRowCount = 0;

      if (this.props.options.paging) {
        var startIndex = this.props.currentPage * this.props.pageSize;
        var endIndex = startIndex + this.props.pageSize;
        renderData = renderData.slice(startIndex, endIndex);
        emptyRowCount = this.props.pageSize - renderData.length;
      }

      return React.createElement(_core.TableBody, null, this.props.options.filtering && React.createElement(this.props.components.FilterRow, {
        columns: this.props.columns.filter(function (columnDef) {
          return !columnDef.hidden;
        }),
        icons: this.props.icons,
        emptyCell: this.props.options.selection || this.props.actions && this.props.actions.filter(function (a) {
          return !a.isFreeAction && !_this2.props.options.selection;
        }).length > 0,
        hasActions: this.props.actions && this.props.actions.filter(function (a) {
          return !a.isFreeAction && !_this2.props.options.selection;
        }).length > 0,
        actionsColumnIndex: this.props.options.actionsColumnIndex,
        onFilterChanged: this.props.onFilterChanged,
        selection: this.props.options.selection,
        onFilterSelectionChanged: this.props.onFilterSelectionChanged,
        localization: (0, _objectSpread2.default)({}, MTableBody.defaultProps.localization.filterRow, this.props.localization.filterRow),
        hasDetailPanel: !!this.props.detailPanel
      }), renderData.map(function (data, index) {
        return React.createElement(_this2.props.components.Row, {
          components: _this2.props.components,
          icons: _this2.props.icons,
          data: data,
          index: index,
          key: index,
          options: _this2.props.options,
          onRowSelected: _this2.props.onRowSelected,
          actions: _this2.props.actions,
          columns: _this2.props.columns,
          getFieldValue: _this2.props.getFieldValue,
          detailPanel: _this2.props.detailPanel,
          onToggleDetailPanel: _this2.props.onToggleDetailPanel,
          onRowClick: _this2.props.onRowClick
        });
      }), this.renderEmpty(emptyRowCount, renderData));
    }
  }]);
  return MTableBody;
}(React.Component);

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false,
  localization: {
    emptyDataSourceMessage: 'No records to display',
    filterRow: {}
  }
};
MTableBody.propTypes = {
  actions: _propTypes.default.array,
  components: _propTypes.default.object.isRequired,
  columns: _propTypes.default.array.isRequired,
  currentPage: _propTypes.default.number,
  detailPanel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.arrayOf(_propTypes.default.object)]),
  getFieldValue: _propTypes.default.func.isRequired,
  icons: _propTypes.default.object.isRequired,
  onRowSelected: _propTypes.default.func,
  options: _propTypes.default.object.isRequired,
  pageSize: _propTypes.default.number,
  renderData: _propTypes.default.array,
  selection: _propTypes.default.bool.isRequired,
  onFilterSelectionChanged: _propTypes.default.func.isRequired,
  localization: _propTypes.default.object,
  onFilterChanged: _propTypes.default.func,
  onToggleDetailPanel: _propTypes.default.func.isRequired,
  onRowClick: _propTypes.default.func
};
var _default = MTableBody;
exports.default = _default;