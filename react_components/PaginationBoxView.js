'use strict';

var React              = require('react');
var classNames         = require('classnames');
var PaginationListView = require('./PaginationListView');

var PaginationBoxView = React.createClass({

  propTypes: {
    pageNum               : React.PropTypes.number.isRequired,
    pageRangeDisplayed    : React.PropTypes.number.isRequired,
    marginPagesDisplayed  : React.PropTypes.number.isRequired,
    total                 : React.PropTypes.number,
    previousLabel         : React.PropTypes.node,
    nextLabel             : React.PropTypes.node,
    breakLabel            : React.PropTypes.node,
    clickCallback         : React.PropTypes.func,
    initialSelected       : React.PropTypes.number,
    forceSelected         : React.PropTypes.number,
    containerClassName    : React.PropTypes.string,
    subContainerClassName : React.PropTypes.string,
    pageClassName         : React.PropTypes.string,
    pageLinkClassName     : React.PropTypes.string,
    activeClassName       : React.PropTypes.string,
    previousClassName     : React.PropTypes.string,
    nextClassName         : React.PropTypes.string,
    previousLinkClassName : React.PropTypes.string,
    nextLinkClassName     : React.PropTypes.string,
    disabledClassName     : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      pageNum              : 10,
      pageRangeDisplayed   : 2,
      marginPagesDisplayed : 3,
      total                : undefined,
      activeClassName      : "selected",
      previousClassName    : "previous",
      nextClassName        : "next",
      previousLabel        : "Previous",
      nextLabel            : "Next",
      breakLabel           : "...",
      disabledClassName    : "disabled"
    };
  },

  getInitialState: function() {
    return {
      selected: this.props.initialSelected ? this.props.initialSelected : 0
    };
  },

  handlePageSelected: function(selected, event) {
    event.preventDefault();

    if (this.state.selected === selected) return;

    this.setState({selected: selected});

    if (typeof(this.props.clickCallback) !== "undefined" &&
        typeof(this.props.clickCallback) === "function") {
      this.props.clickCallback({selected: selected});
    }
  },

  handlePreviousPage: function(event) {
    event.preventDefault();
    if (this.state.selected > 0) {
      this.handlePageSelected(this.state.selected - 1, event);
    }
  },

  handleNextPage: function(event) {
    event.preventDefault();
    if (this.state.selected < this.props.pageNum - 1) {
      this.handlePageSelected(this.state.selected + 1, event);
    }
  },

  render: function() {
    var disabled = this.props.disabledClassName;

    var previousClasses = classNames(this.props.previousClassName,
                                     {disabled: this.state.selected === 0});

    var nextClasses = classNames(this.props.nextClassName,
                                 {disabled: this.state.selected === this.props.pageNum - 1});

    return (
      <ul className={this.props.containerClassName}>
        <li onClick={this.handlePreviousPage} className={previousClasses}>
          <a href="" className={this.props.previousLinkClassName}>{this.props.previousLabel}</a>
        </li>

        <PaginationListView
          onPageSelected={this.handlePageSelected}
          selected={this.state.selected}
          pageNum={this.props.pageNum}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          marginPagesDisplayed={this.props.marginPagesDisplayed}
          breakLabel={this.props.breakLabel}
          subContainerClassName={this.props.subContainerClassName}
          pageClassName={this.props.pageClassName}
          pageLinkClassName={this.props.pageLinkClassName}
          activeClassName={this.props.activeClassName}
          disabledClassName={this.props.disabledClassName} />

        <li onClick={this.handleNextPage} className={nextClasses}>
          <a href="" className={this.props.nextLinkClassName}>{this.props.nextLabel}</a>
        </li>

        {(this.props.total !== undefined) &&
          <li style={{float: 'right', width: 'auto'}}>Total rows: {this.props.total}</li>
        }
      </ul>
    );
  },

  componentWillReceiveProps: function (nextProps) {
    if (typeof nextProps.forceSelected !== 'undefined' && nextProps.forceSelected !== this.state.selected) {
      this.setState({ selected: nextProps.forceSelected });
    }
  }
});

module.exports = PaginationBoxView;
