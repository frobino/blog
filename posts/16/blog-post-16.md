---
title: Overclock Radxa 4c+.
description: Notes on how to overclock a SBC.
date: 2026-05-09
tags:
layout: "layouts/post.njk"
---

```bash
# Check the running model
cat /proc/device-tree/model
> Radxa ROCK 4C+
# See what compatible strings the running DT has
cat /proc/device-tree/compatible | tr '\0' '\n'
> radxa,rock-4c-plus
> rockchip,rk3399
# List available rock4 DTBs
ls /boot/dtb/rockchip/ | grep rock-4
rk3399-rock-4c-plus.dtb
rk3399-rock-4se.dtb
# Check boot log for stb selection
sudo dmesg | grep -i "dtb\|fdt\|device tree\|rock" | head -20
> [    0.000000] Linux version 6.12.44-current-rockchip64 (build@armbian) (aarch64-linux-gnu-gcc (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0, GNU ld (GNU Binutils for Ubuntu) 2.42) #1 SMP PREEMPT Thu Aug 28 14:31:16 UTC 2025
> [    0.000000] Machine model: Radxa ROCK 4C+
> [    0.090492] rockchip-gpio ff720000.gpio: probed /pinctrl/gpio@ff720000
> [    0.091314] rockchip-gpio ff730000.gpio: probed /pinctrl/gpio@ff730000
> [    0.092039] rockchip-gpio ff780000.gpio: probed /pinctrl/gpio@ff780000
```

Backup and decompile:

```bash
# Backup
sudo cp /boot/dtb/rockchip/rk3399-rock-4c-plus.dtb \
        /boot/dtb/rockchip/rk3399-rock-4c-plus.dtb.bak

# Install dtc if needed
sudo apt install device-tree-compiler -y

# Decompile
dtc -I dtb -O dts \
  /boot/dtb/rockchip/rk3399-rock-4c-plus.dtb \
  -o ~/rock4c_plus.dts 2>/dev/null
```

Find the Big Core OPP table:

```bash
grep -n "1512000000\|opp-table\|cluster1" ~/rock4c_plus.dts | head -30
```

Go to line ~3613 (the `opp06` closing `};`) and add after it, **before the table's closing `};`**:

```text
opp07 {
	opp-hz = <0x00 0x5f5e1000>;
	opp-microvolt = <0x11e1a4 0x11e1a4 0x1312d0>;
};

opp08 {
	opp-hz = <0x00 0x6b49d200>;
	opp-microvolt = <0x1194f0 0x1194f0 0x1312d0>;
};
```

What these mean:

| Entry    | Hex Hz  | Frequency | Voltage |
| -------- | ------- | -------   | ------- |
| opp07    | 0x5f5e1000 | 1,608 MHz | 1.172V |
| opp08    | 0x6b49d200	| 1,800 MHz | 1.150V |

Recompile and Flash:

```bash
dtc -I dts -O dtb ~/rock4c_plus.dts \
  -o ~/rk3399-rock-4c-plus-oc.dtb 2>/dev/null

sudo cp ~/rk3399-rock-4c-plus-oc.dtb \
  /boot/dtb/rockchip/rk3399-rock-4c-plus.dtb

sudo reboot
```

Verify that the new frequencies are available:

```bash
cat /sys/devices/system/cpu/cpu4/cpufreq/scaling_available_frequencies
```

You should now see 1608000 and 1800000 in the list.

Set them:

```bash
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 1800000 | sudo tee /sys/devices/system/cpu/cpu4/cpufreq/scaling_max_freq
echo 1800000 | sudo tee /sys/devices/system/cpu/cpu5/cpufreq/scaling_max_freq
```

Make it persistant after reboot:

```bash
sudo nano /etc/systemd/system/cpu-oc.service
```

Paste:

```text
[Unit]
Description=CPU Overclock Settings
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c '\
  echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor && \
  echo 1800000 | tee /sys/devices/system/cpu/cpu4/cpufreq/scaling_max_freq && \
  echo 1800000 | tee /sys/devices/system/cpu/cpu5/cpufreq/scaling_max_freq'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable cpu-oc.service
sudo systemctl start cpu-oc.service
```
