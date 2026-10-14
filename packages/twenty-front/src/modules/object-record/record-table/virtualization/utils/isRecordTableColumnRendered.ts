import { type RecordTableColumnRange } from '@/object-record/record-table/virtualization/types/RecordTableColumnRange';
import { isDefined } from 'twenty-shared/utils';

export const isRecordTableColumnRendered = ({
  columnIndex,
  renderedColumnRange,
  focusedColumnIndexOutsideRange,
}: {
  columnIndex: number;
  renderedColumnRange: RecordTableColumnRange | null;
  focusedColumnIndexOutsideRange: number | null;
}) =>
  columnIndex === 0 ||
  columnIndex === focusedColumnIndexOutsideRange ||
  (isDefined(renderedColumnRange) &&
    columnIndex >= renderedColumnRange.startColumnIndex &&
    columnIndex <= renderedColumnRange.endColumnIndex);
