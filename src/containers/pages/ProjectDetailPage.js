import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProjectDetailRequest } from '../../actions/projectDetail';
import Loader from '../../components/Loader';
import ProjectDetail from '../../components/ProjectDetail';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const ProjectDetailPage = ({ isFetching, projectDetail, onEditClick, onAddMemberClick }) => (
  <div>
    {isFetching ? <Loader /> : <ProjectDetail projectDetail={projectDetail} onEditClick={onEditClick} onAddMemberClick={onAddMemberClick} />}
  </div>
);

ProjectDetailPage.defaultProps = {
  isFetching: true,
  projectDetail: {}
};

ProjectDetailPage.propTypes = {
  isFetching: PropTypes.bool,
  projectDetail: PropTypes.object,
  onEditClick: PropTypes.func.isRequired,
  onAddMemberClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.projectDetail.isFetching,
  projectDetail: state.projectDetail
});

const mapDispatchToProps = dispatch => ({
  fetchProjectDetail: projectId => dispatch(fetchProjectDetailRequest(projectId)),
  onEditClick: projectDetail => dispatch(openModal(modalNames.EDIT_PROJECT, { projectDetail })),
  onAddMemberClick: projectId => dispatch(openModal(modalNames.ADD_MEMBER, { projectId }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProjectDetail, match: { params } } = this.props;
      fetchProjectDetail(params.id);
    }
  })
);

export default enhance(ProjectDetailPage);
