"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var MTableBodyRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(MTableBodyRow, _React$Component);

  function MTableBodyRow() {
    (0, _classCallCheck2.default)(this, MTableBodyRow);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MTableBodyRow).apply(this, arguments));
  }

  (0, _createClass2.default)(MTableBodyRow, [{
    key: "renderColumns",
    value: function renderColumns() {
      var _this = this;

      var mapArr = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden;
      }).map(function (columnDef) {
        var value = _this.props.getFieldValue(_this.props.data, columnDef);

        return React.createElement(_this.props.components.Cell, {
          icons: _this.props.icons,
          columnDef: columnDef,
          value: value,
          key: columnDef.tableData.id,
          rowData: _this.props.data
        });
      });
      return mapArr;
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this2 = this;

      return React.createElement(_core.TableCell, {
        style: {
          paddingTop: 0,
          paddingBottom: 0
        },
        key: "key-actions-column"
      }, React.createElement("div", {
        style: {
          display: 'flex'
        }
      }, React.createElement(this.props.components.Actions, {
        data: this.props.data,
        actions: this.props.actions.filter(function (a) {
          return !a.isFreeAction && !_this2.props.options.selection;
        })
      })));
    }
  }, {
    key: "renderSelectionColumn",
    value: function renderSelectionColumn() {
      return React.createElement(_core.TableCell, {
        padding: "none",
        key: "key-selection-column"
      }, React.createElement(_core.Checkbox, {
        checked: this.props.data.tableData.checked === true,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        value: "".concat(this.props.data.tableData.id),
        onChange: this.props.onRowSelected
      }));
    }
  }, {
    key: "renderDetailPanelColumn",
    value: function renderDetailPanelColumn() {
      var _this3 = this;

      var rotateIconStyle = function rotateIconStyle(isOpen) {
        return {
          transform: isOpen ? 'rotate(90deg)' : 'none'
        };
      };

      var CustomIcon = function CustomIcon(_ref) {
        var icon = _ref.icon,
            style = _ref.style;
        return typeof icon === "string" ? React.createElement(_core.Icon, {
          style: style
        }, icon) : React.createElement(icon, {
          style: style
        });
      };

      if (typeof this.props.detailPanel == 'function') {
        return React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-detail-panel-column",
          style: {
            width: 48,
            textAlign: 'center'
          }
        }, React.createElement(_core.IconButton, {
          style: (0, _objectSpread2.default)({
            transition: 'all ease 200ms'
          }, rotateIconStyle(this.props.data.tableData.showDetailPanel)),
          onClick: function onClick(event) {
            _this3.props.onToggleDetailPanel(_this3.props.data, _this3.props.detailPanel);

            event.stopPropagation();
          }
        }, React.createElement(this.props.icons.DetailPanel, null)));
      } else {
        return React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-detail-panel-column",
          style: {
            width: 48 * this.props.detailPanel.length,
            textAlign: 'center'
          }
        }, this.props.detailPanel.map(function (panel, index) {
          var isOpen = _this3.props.data.tableData.showDetailPanel === panel.render;
          var iconButton = React.createElement(_this3.props.icons.DetailPanel, null);
          var animation = true;

          if (isOpen) {
            if (panel.openIcon) {
              iconButton = React.createElement(CustomIcon, {
                icon: panel.openIcon
              });
              animation = false;
            } else if (panel.icon) {
              iconButton = React.createElement(CustomIcon, {
                icon: panel.icon
              });
            }
          } else if (panel.icon) {
            iconButton = React.createElement(CustomIcon, {
              icon: panel.icon
            });
            animation = false;
          }

          iconButton = React.createElement(_core.IconButton, {
            key: "key-detail-panel-" + index,
            style: (0, _objectSpread2.default)({
              transition: 'all ease 200ms'
            }, rotateIconStyle(animation && isOpen)),
            onClick: function onClick() {
              return _this3.props.onToggleDetailPanel(_this3.props.data, panel.render);
            }
          }, iconButton);

          if (panel.tooltip) {
            iconButton = React.createElement(_core.Tooltip, {
              key: "key-detail-panel-" + index,
              title: panel.tooltip
            }, iconButton);
          }

          return iconButton;
        }));
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      if (!this.props.options.rowStyle) {
        return {
          cursor: this.props.onRowClick ? 'pointer' : ''
        };
      }

      var style = this.props.options.rowStyle;

      if (typeof this.props.options.rowStyle === "function") {
        style = this.props.options.rowStyle(this.props.data);
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var columns = this.renderColumns();

      if (this.props.options.selection) {
        columns.splice(0, 0, this.renderSelectionColumn());
      }

      if (this.props.actions && this.props.actions.filter(function (a) {
        return !a.isFreeAction && !_this4.props.options.selection;
      }).length > 0) {
        if (this.props.options.actionsColumnIndex === -1) {
          columns.push(this.renderActions());
        } else if (this.props.options.actionsColumnIndex >= 0) {
          var endPos = 0;

          if (this.props.options.selection) {
            endPos = 1;
          }

          columns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
        }
      } // Lastly we add detail panel icon


      if (this.props.detailPanel) {
        columns.splice(0, 0, this.renderDetailPanelColumn());
      }

      return React.createElement(React.Fragment, null, React.createElement(_core.TableRow, {
        selected: this.props.index % 2 === 0,
        hover: this.props.onRowClick ? true : false,
        style: this.getStyle(),
        onClick: function onClick(event) {
          _this4.props.onRowClick && _this4.props.onRowClick(event, _this4.props.data);
        }
      }, columns), this.props.data.tableData.showDetailPanel && React.createElement(_core.TableRow, {
        selected: this.props.index % 2 === 0
      }, React.createElement(_core.TableCell, {
        colSpan: columns.length,
        padding: "none"
      }, this.props.data.tableData.showDetailPanel(this.props.data))));
    }
  }]);
  return MTableBodyRow;
}(React.Component);

exports.default = MTableBodyRow;
MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {}
};
MTableBodyRow.propTypes = {
  actions: _propTypes.default.array,
  icons: _propTypes.default.any.isRequired,
  index: _propTypes.default.number.isRequired,
  data: _propTypes.default.object.isRequired,
  detailPanel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.arrayOf(_propTypes.default.object)]),
  options: _propTypes.default.object.isRequired,
  onRowSelected: _propTypes.default.func,
  getFieldValue: _propTypes.default.func.isRequired,
  columns: _propTypes.default.array,
  onToggleDetailPanel: _propTypes.default.func.isRequired,
  onRowClick: _propTypes.default.func
};