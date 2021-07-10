import { forwardRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const getContainer = (container) => {
  container = typeof container === "function" ? container() : container;
  return ReactDOM.findDOMNode(container);
};

const Portal = forwardRef((props, ref) => {
  const { children, disablePortal, container } = props;
  const [monutedNode, setMountedNode] = useState(null);

  useEffect(() => {
    if (!disablePortal) {
      setMountedNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  return monutedNode ? ReactDOM.createPortal(children, monutedNode) : monutedNode;
});

export default Portal;
