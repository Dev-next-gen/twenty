import { RecordTableComponentInstanceContext } from '@/object-record/record-table/states/context/RecordTableComponentInstanceContext';
import { recordTableFocusPositionComponentState } from '@/object-record/record-table/states/recordTableFocusPositionComponentState';
import { recordTableRenderedColumnRangeComponentState } from '@/object-record/record-table/virtualization/states/recordTableRenderedColumnRangeComponentState';
import { isRecordTableColumnRendered } from '@/object-record/record-table/virtualization/utils/isRecordTableColumnRendered';
import { createAtomComponentSelector } from '@/ui/utilities/state/jotai/utils/createAtomComponentSelector';
import { isDefined } from 'twenty-shared/utils';

export const recordTableFocusedColumnIndexOutsideRangeComponentSelector =
  createAtomComponentSelector<number | null>({
    key: 'recordTableFocusedColumnIndexOutsideRangeComponentSelector',
    componentInstanceContext: RecordTableComponentInstanceContext,
    get:
      ({ instanceId }) =>
      ({ get }) => {
        const focusPosition = get(recordTableFocusPositionComponentState, {
          instanceId,
        });

        if (!isDefined(focusPosition)) {
          return null;
        }

        const isFocusedColumnRendered = isRecordTableColumnRendered({
          columnIndex: focusPosition.column,
          renderedColumnRange: get(
            recordTableRenderedColumnRangeComponentState,
            { instanceId },
          ),
          focusedColumnIndexOutsideRange: null,
        });

        return isFocusedColumnRendered ? null : focusPosition.column;
      },
  });
