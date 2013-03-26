#!/usr/bin/perl -w

use strict;

while (<>) {
    my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) =
	localtime();
    my $time_string = sprintf("%04d-%02d-%02d %02d:%02d:%02d", $year+1900, $mon+1, $mday, $hour, $min, $sec);

    if (/^ [A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}  [A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}/) {
	s/\s+$//;
	syswrite(\*STDOUT, "C $time_string$_\n");
    } elsif (/^ [A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}/) {
	s/\s+$//;
	syswrite(\*STDOUT, "A $time_string$_\n");
    }
}
