---
title: NAS with Samba.
description: NAS with Samba.
date: 2024-09-28
tags:
- NAS
- Samba
layout: "layouts/post.njk"
---

## How to format disk to exFAT.

See [this tutorial][exfat-tutorial]. Uses gdisk and mkfs cli tools.

```
sudo apt install exfuse
sudo apt install exfat-fuse
sudo gparted
sudo gdisk /dev/sdb
sudo mkfs -t exfat /dev/sdb1 
sudo mkfs -t exfat /dev/sdb2 
```

## Install and configure Samba

Mount the disks that will be used to store the data:

```
# The umask parameter is needed for exfat to be mounted as 755
sudo mount /dev/sdb1 /media/bbib/4680-EF03 -o umask=0000
```

Install Samba:

```
sudo apt update
sudo apt install samba
sudo cp /etc/samba/smb.comf /etc/samba/smb.comf.bak
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
sudo emacs /etc/samba/smb.conf&
```

Edit the conf file adding the following configuration, where 

```
[sda1]
path = /home/bbib/samba/
Browseable = yes
Writeable = Yes
only guest = no
create mask = 0777
directory mask = 0777
Public = no
Guest ok = no
valid users = frallan

[sdb1]
path = /home/bbib/samba-usb/
Browseable = yes
Writeable = Yes
only guest = no
create mask = 0777
directory mask = 0777
Public = no
Guest ok = no
valid users = frallan
```

Add the user that will be used to access the disks:

```
sudo adduser frallan
sudo smbpasswd -a frallan
sudo systemctl restart smbd
```

If needed, users can be removed:

```
sudo smbpasswd -x frallan
```

## Use a app to access the NAS:

For example *Cx File Explorer*

[exfat-tutorial]:https://linuxconfig.org/how-to-format-usb-with-exfat-on-linux
