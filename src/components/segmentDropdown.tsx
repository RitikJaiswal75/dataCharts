import useGetSegmentsData from "@/hooks/useGetSegmentsData";
import { SegmentDropdownProps } from "@/types/componentProps";
import { getDisplayNameFromSegmentID } from "@/utils/getDisplayName";

function SegmentDropdown({
    selectedSegmentId,
    setSegmentId,
    selectedSegmentName,
}: SegmentDropdownProps) {
    const { data: segments, isLoading: segmentLoading } = useGetSegmentsData();
    if (segmentLoading || !segments) return null;
    return (
        <select
            className="h-8 rounded bg-slate-100 px-2"
            onChange={(e) => {
                setSegmentId(e.target.value);
                selectedSegmentName.current = getDisplayNameFromSegmentID(
                    e.target.value,
                    segments[1].values
                );
            }}
        >
            {segments[1].values.map((segment: any, index: number) => {
                if (segment.segmentId === selectedSegmentId) {
                    selectedSegmentName.current = segment.displayName;
                }
                return (
                    <option
                        value={segment.segmentId}
                        selected={segment.segmentId === selectedSegmentId}
                        key={`${segment.segmentId}-${index}`}
                    >
                        {segment.displayName}
                    </option>
                );
            })}
        </select>
    );
}

export default SegmentDropdown;
