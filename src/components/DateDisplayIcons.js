import DateRangeIcon from '@material-ui/icons/DateRange';
import { Grid } from '@material-ui/core';
import React from 'react';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { connect } from 'react-redux';
import { setDisplay, setOrder } from '../actions/movieActions';

const Icons = ({ movie: { display, order }, setDisplay, setOrder }) => (
  <Grid
    className="icons-wrapper"
    container
    alignItems="center"
    wrap="nowrap"
    justify="center"
  >
    {display === 'module' ? (
      <ViewComfyIcon
        onClick={() => setDisplay('list')}
        cursor={'pointer'}
        color="secondary"
        fontSize="large"
      />
    ) : display === 'list' ? (
      <ViewListIcon
        onClick={() => setDisplay('module')}
        cursor={'pointer'}
        color="secondary"
        fontSize="large"
      />
    ) : null}
    <div
      onClick={() => setOrder(order === 'oldest' ? 'latest' : 'oldest')}
      className="icons-wrapper-date"
    >
      <DateRangeIcon
        className="icon-margin"
        color="secondary"
        fontSize="default"
      />
      <ImportExportIcon color="secondary" fontSize="default" />
    </div>
  </Grid>
);

const mapStateToProps = state => {
  return {
    movie: state.movie,
  };
};

export default connect(mapStateToProps, { setDisplay, setOrder })(Icons);
