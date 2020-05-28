import React, { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import "./TodoForm.css";

const mapStateToProps = (state) => {
  // console.log(state.todoDrawer.formInfo);
  return {
    entryEdited: state.todoDrawer.entryEdited,
    formInfo: state.todoDrawer.formInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: bindActionCreators((e, inputId) => {
    return { type: "EDIT_FORM", inputInfo: { [inputId]: e.target.value } };
  }, dispatch),
  saveEntry: bindActionCreators((entry) => ({ type: "SAVE_TODO" , entry}), dispatch),
  clickReloadButton: bindActionCreators((node) => {
    // 此处问题待解决，实际需要达到的效果是，去除node节点的红框效果
    node.current.blur();
    return { type: "RELOAD_ENTRY" };
  }, dispatch),
  clearForm: bindActionCreators(
    () => ({ type: "EDIT_TODO", show: false }),
    dispatch
  ),
});

const Form = ({
  entryEdited,
  formInfo,
  onChange,
  saveEntry,
  clickReloadButton,
  clearForm,
}) => {
  const node = useRef(null);
  return (
    <form /* action="" method="post" */>
      <div className="form-group">
        <label htmlFor="title">
          <span className="red_txt todoForm_spaceSpan--right">*</span>任务名称
        </label>
        <input
          className="form-control"
          id="title"
          value={formInfo.title}
          ref={node}
          onChange={(e) => onChange(e, "title")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueTo">
          <span className="red_txt todoForm_spaceSpan--right">*</span>
          任务截止日期
        </label>
        <input
          type="date"
          className="form-control"
          id="dueTo"
          min={new Date()
            .toLocaleDateString()
            .split("/")
            .map((num) => num.padStart(2, "0"))
            .join("-")}
          value={formInfo.dueTo}
          onChange={(e) => onChange(e, "dueTo")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">任务内容</label>
        <input
          className="form-control"
          id="content"
          value={formInfo.content}
          onChange={(e) => onChange(e, "content")}
        />
      </div>
      <div className="todoForm_div--evenSpread">
        <button
          type="submit"
          className="btn bordered_btn btn-primary"
          onClick={() => {
            saveEntry((entryEdited.id ? {...formInfo, id: entryEdited.id} : formInfo));
            clearForm();
          }}
        >
          保存
        </button>
        <button
          className="btn bordered_btn"
          onClick={() => clickReloadButton(node)}
        >
          重置
        </button>
        <button
          className="btn bordered_btn red_txt btn_light"
          onClick={clearForm}
        >
          取消
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  entryEdited: PropTypes.object,
  formInfo: PropTypes.object,
  onChange: PropTypes.func,
  clickSaveButton: PropTypes.func,
  clickReloadButton: PropTypes.func,
  clickCancelButton: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
