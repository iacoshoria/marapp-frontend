/*
  Copyright 2018-2020 National Geographic Society

  Use of this software does not constitute endorsement by National Geographic
  Society (NGS). The NGS name and NGS logo may not be used for any purpose without
  written permission from NGS.

  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed
  under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import React, { PureComponent, ReactNode } from 'react';
import classnames from 'classnames';

// Components
import Modal from 'react-modal';

// Styles
import './styles.scss';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onRequestClose: () => {};
  className: string;
  header: ReactNode;
  showCloseButton: boolean;
  parentSelector?: () => HTMLDivElement;
  onAfterOpen: () => {};
}

class ModalComponent extends PureComponent<ModalProps> {
  static defaultProps = {
    className: '',
    header: null,
    onAfterOpen: () => {},
    parentSelector: () => document.body,
  };

  render() {
    const {
      children,
      isOpen,
      className,
      header,
      onAfterOpen,
      onRequestClose,
      showCloseButton = false,
      parentSelector,
    } = this.props;

    const classNames = classnames('c-modal', 'marapp-qa-modal', {
      [className]: !!className,
    });

    return (
      <Modal
        className={classNames}
        overlayClassName="c-modal-overlay"
        bodyOpenClassName="-no-scroll"
        isOpen={isOpen}
        ariaHideApp={false}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        parentSelector={parentSelector}
      >
        {header}

        {showCloseButton && (
          <button
            type="button"
            className="modal-close"
            onClick={(e: any) => e.stopPropagation() || onRequestClose()}
          >
            <i className="ng-icon-close" />
          </button>
        )}

        <div className="modal-content">{children}</div>
      </Modal>
    );
  }
}

export default ModalComponent;
