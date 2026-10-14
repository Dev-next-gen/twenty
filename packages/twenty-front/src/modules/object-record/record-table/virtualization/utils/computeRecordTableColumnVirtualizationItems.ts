import { type RecordField } from '@/object-record/record-field/types/RecordField';
import { type RecordTableColumnRange } from '@/object-record/record-table/virtualization/types/RecordTableColumnRange';
import { type RecordTableColumnVirtualizationItem } from '@/object-record/record-table/virtualization/types/RecordTableColumnVirtualizationItem';
import { isRecordTableColumnRendered } from '@/object-record/record-table/virtualization/utils/isRecordTableColumnRendered';

export const computeRecordTableColumnVirtualizationItems = ({
  visibleRecordFields,
  renderedColumnRange,
  focusedColumnIndexOutsideRange,
}: {
  visibleRecordFields: Pick<RecordField, 'size'>[];
  renderedColumnRange: RecordTableColumnRange | null;
  focusedColumnIndexOutsideRange: number | null;
}): RecordTableColumnVirtualizationItem[] => {
  const items: RecordTableColumnVirtualizationItem[] = [];

  for (
    let columnIndex = 1;
    columnIndex < visibleRecordFields.length;
    columnIndex++
  ) {
    if (
      isRecordTableColumnRendered({
        columnIndex,
        renderedColumnRange,
        focusedColumnIndexOutsideRange,
      })
    ) {
      items.push({ type: 'column', columnIndex });
      continue;
    }

    const columnWidth = visibleRecordFields[columnIndex].size;
    const lastItem = items.at(-1);

    if (lastItem?.type === 'spacer') {
      lastItem.width += columnWidth;
    } else {
      items.push({
        type: 'spacer',
        firstColumnIndex: columnIndex,
        width: columnWidth,
      });
    }
  }

  return items;
};
