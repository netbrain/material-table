"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _materialTable = _interopRequireDefault(require("./material-table"));

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      selectedCount: 0,
      data: [{
        name: 'Mehmet',
        surname: 'Baran',
        birthYear: 1987
      }, {
        name: 'Gülcan',
        surname: 'Baran',
        birthYear: 1987
      }, {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 63
      }],
      columns: [{
        title: 'Adı',
        field: 'name',
        customSort: function customSort(a, b) {
          return a.name.length - b.name.length;
        }
      }, {
        title: 'Soyadı',
        field: 'surname'
      }, {
        title: 'Doğum Yılı',
        field: 'birthYear',
        type: 'numeric'
      }, {
        title: 'Doğum Yeri',
        field: 'birthCity',
        lookup: {
          34: 'İstanbul',
          63: 'Şanlıurfa'
        }
      }]
    });
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        style: {
          maxWidth: '100%'
        }
      }, _react.default.createElement(_materialTable.default, {
        columns: [{
          title: 'Adı',
          field: 'name',
          customSort: function customSort(a, b) {
            return a.name.length - b.name.length;
          }
        }, {
          title: 'Soyadı',
          field: 'surname'
        }, {
          title: 'Doğum Yılı',
          field: 'birthYear',
          type: 'numeric'
        }, {
          title: 'Doğum Yeri',
          field: 'birthCity',
          lookup: {
            34: 'İstanbul',
            63: 'Şanlıurfa'
          }
        }],
        data: this.state.data,
        title: "Demo Title",
        options: {
          filtering: true
        }
      }), this.state.selectedCount, _react.default.createElement("button", {
        onClick: function onClick() {
          _this2.setState({
            selectedCount: _this2.state.selectedCount + 1
          });
        }
      }, "ok"));
    }
  }]);
  return App;
}(_react.Component);

_reactDom.default.render(_react.default.createElement(App, null), document.getElementById('app'));

module.hot.accept();