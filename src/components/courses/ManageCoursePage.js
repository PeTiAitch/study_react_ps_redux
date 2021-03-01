import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors }) => {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) =>
        alert("Loading courses failed! Error: " + error)
      );
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) =>
        alert("Loading authors failed! Error: " + error)
      );
    }
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
};

ManageCoursePage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
