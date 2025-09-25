# Intel PT

```
sudo sh -c "echo -1 > /proc/sys/kernel/perf_event_paranoid"
perf record -e intel_pt//u ./sched_nr_parallel_test
```

Creates a perf.data file containing the intel pt data.

## perf2perfetto

[perf2perfetto](https://github.com/michoecho/perf2perfetto) decodes the perf.data to fuchsia traces.

Create this script:

```
#!/bin/bash
# decode_pt.sh

RELSTART=$1
DURATION=$2
DLFILTER_PATH="$3"
OUT_FILENAME="$4"
MODE="$5"

ABSSTART=$(perf script -f --itrace=i0ns -Ftime -i perf.data | head -n1 | tr -d ':[:space:]')
START=$(echo "$ABSSTART + $RELSTART" | bc)
END=$(echo "$START + $DURATION" | bc)

perf script -f --itrace=bei0ns -i perf.data --dlfilter "$DLFILTER_PATH" --time $START,$END --dlarg "$OUT_FILENAME" --dlarg $MODE
```

Launch the script as follows:

```
export DLFILTER_PATH=~/Projects/perf2perfetto/target/release/libperf2perfetto.so
./decode_pt.sh 0.00 0.03 "$DLFILTER_PATH" out_cyc_0.01-0.04.ftf c
./decode_pt.sh 0.00 0.03 "$DLFILTER_PATH" out_cyc_0.01-0.04_i.ftf i
```

## magic-trace

```
~/Tools/magic-trace/1.1.0/magic-trace attach -pid $(pidof demo)
~/Tools/magic-trace/1.1.0/magic-trace run ./sched_nr_parallel_test // creates trace.fxt
~/Tools/magic-trace/1.1.0/magic-trace run -multi-thread ./sched_nr_parallel_test 
~/Tools/magic-trace/1.1.0/magic-trace run -full-execution -multi-thread ./sched_nr_parallel_test   
```
