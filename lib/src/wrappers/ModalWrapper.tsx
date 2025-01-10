import * as React from 'react';
import ModalDialog from '../_shared/ModalDialog';
import { WrapperProps } from './Wrapper';
import { Omit } from '../_helpers/utils';
import { useKeyDown } from '../_shared/hooks/useKeyDown';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';

export interface ModalWrapperProps<T = {}> extends WrapperProps<T> {
  /**
   * "OK" label message
   * @default "OK"
   */
  okLabel?: React.ReactNode;
  /**
   * "CANCEL" label message
   * @default "CANCEL"
   */
  cancelLabel?: React.ReactNode;
  /**
   * "CLEAR" label message
   * @default "CLEAR"
   */
  clearLabel?: React.ReactNode;
  /**
   * "TODAY" label message
   * @default "TODAY"
   */
  todayLabel?: React.ReactNode;
  /**
   * If true today button will be displayed <b>Note*</b> that clear button has higher priority
   * @default false
   */
  showTodayButton?: boolean;
  /**
   * Show clear action in picker dialog
   * @default false
   */
  clearable?: boolean;
  /**
   * Props to be passed directly to material-ui Dialog
   * @type {Partial<MuiDialogProps>}
   */
  DialogProps?: Partial<Omit<MuiDialogProps, 'classes'>>;
}

const defProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  todayLabel: 'Today',
  clearable: false,
  showTodayButton: false,
};

export const ModalWrapper: React.FC<ModalWrapperProps<any>> = ({
  open,
  children,
  okLabel = defProps.okLabel,
  cancelLabel = defProps.cancelLabel,
  clearLabel = defProps.clearLabel,
  todayLabel = defProps.todayLabel,
  showTodayButton = defProps.showTodayButton,
  clearable = defProps.clearable,
  DialogProps,
  showTabs,
  wider,
  InputComponent,
  DateInputProps,
  onClear,
  onAccept,
  onDismiss,
  onSetToday,
  ...other
}) => {
  useKeyDown(open, {
    Enter: onAccept,
  });

  return (
    <React.Fragment>
      <InputComponent {...other} {...DateInputProps} />

      <ModalDialog
        wider={wider}
        showTabs={showTabs}
        open={open}
        onClear={onClear}
        onAccept={onAccept}
        onDismiss={onDismiss}
        onSetToday={onSetToday}
        clearLabel={clearLabel}
        todayLabel={todayLabel}
        okLabel={okLabel}
        cancelLabel={cancelLabel}
        clearable={clearable}
        showTodayButton={showTodayButton}
        children={children}
        {...DialogProps}
      />
    </React.Fragment>
  );
};
