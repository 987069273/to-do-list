import React, { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return {
    entryEdited: state.todoDrawer.entryEdited,
    formInfo: state.todoDrawer.formInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: bindActionCreators((e, inputId) => {
    return { type: "EDIT_FORM", inputInfo: { [inputId]: e.target.value } };
  }, dispatch),
  saveEntry: bindActionCreators(
    (entry) => ({ type: "SAVE_TODO", entry }),
    dispatch
  ),
  clickReloadButton: bindActionCreators(() => {
    // 此处问题待解决，实际需要达到的效果是，去除node节点的红框效果
    // node.current.blur();
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
  // console.log({ entryEdited, formInfo });
  const node = useRef(null);
  return (
    <form /* action="" method="post" */>
      <div className="form-group">
        <label className="ml-0" htmlFor="title">
          <span className="text-danger mr-1">*</span>任务名称
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
        <label className="ml-0" htmlFor="dueTo">
          <span className="text-danger mr-1">*</span>
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
        <label className="ml-0" htmlFor="title">
          任务内容
        </label>
        <input
          className="form-control"
          id="content"
          value={formInfo.content}
          onChange={(e) => onChange(e, "content")}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className="btn border btn-primary"
          onClick={() => {
            // 去除首尾空格
            const entry = Object.entries(
              entryEdited.id ? { ...formInfo, id: entryEdited.id } : formInfo
            ).reduce(
              (acc, cur) =>
                Object.assign({}, acc, {
                  [cur[0]]: typeof cur[1] === "string" ? cur[1].trim() : cur[1],
                }),
              {}
            );
            // 处理输入未输入有效标题的情况
            if (entry.title.length !== 0) {
              saveEntry(entry);
            }
            clearForm();
          }}
        >
          保存
        </button>
        <button className="btn border" onClick={() => clickReloadButton()}>
          重置
        </button>
        <button
          className="btn border text-danger btn_light"
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
