/* global _ */

/*
 * Complex scripted Logstash dashboard
 * This script generates a dashboard object that Kibana can load. It also takes a number of user
 * supplied URL parameters, none are required:
 *
 * index :: Which index to search? If this is specified, interval is set to 'none'
 * pattern :: Does nothing if index is specified. Set a timestamped index pattern. Default: [logstash-]YYYY.MM.DD
 * interval :: Sets the index interval (eg: day,week,month,year), Default: day
 *
 * split :: The character to split the queries on Default: ','
 * query :: By default, a comma separated list of queries to run. Default: *
 *
 * from :: Search this amount of time back, eg 15m, 1h, 2d. Default: 15m
 * timefield :: The field containing the time to filter on, Default: @timestamp
 *
 * fields :: comma separated list of fields to show in the table
 * sort :: comma separated field to sort on, and direction, eg sort=@timestamp,desc
 *
 */



// Setup some variables
var dashboard, queries, _d_timespan;

// All url parameters are available via the ARGS object
var ARGS;

// Set a default timespan if one isn't specified
_d_timespan = '1d';

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
  services : {}
};

// Set a title
dashboard.title = 'System Info';

// Allow the user to set the index, if they dont, fall back to logstash.
if(!_.isUndefined(ARGS.index)) {
  dashboard.index = {
    default: ARGS.index,
    interval: 'none'
  };
} else {
  // Don't fail to default
  dashboard.failover = false;
  dashboard.index = {
    default: ARGS.index||'ADD_A_TIME_FILTER',
    pattern: ARGS.pattern||'[logstash-]YYYY.MM.DD',
    interval: ARGS.interval||'day'
  };
}

// In this dashboard we let users pass queries as comma separated list to the query parameter.
// Or they can specify a split character using the split aparameter
// If query is defined, split it into a list of query objects
// NOTE: ids must be integers, hence the parseInt()s
if(!_.isUndefined(ARGS.query)) {
  queries = _.object(_.map(ARGS.query.split(ARGS.split||','), function(v,k) {
    return [k,{
      query: v,
      id: parseInt(k,10),
      alias: v
    }];
  }));
} else {
  // No queries passed? Initialize a single query to match everything
  queries = {
    0: {
      query: '*',
      id: 0,
    }
  };
}

// Now populate the query service with our objects
dashboard.services.query = {
  list : queries,
  ids : _.map(_.keys(queries),function(v){return parseInt(v,10);})
};

// Lets also add a default time filter, the value of which can be specified by the user
dashboard.services.filter = {
  list: {
    0: {
      from: "now-"+(ARGS.from||_d_timespan),
      to: "now",
      field: ARGS.timefield||"@timestamp",
      type: "time",
      active: true,
      id: 0,
    }
  },
  ids: [0]
};

// Ok, lets make some rows. The Filters row is collapsed by default
dashboard.rows = [
  {
    title: "Chart",
    height: "200px"
  },
  {
    title: "Events",
    height: "400px"
  }
];

// Hide legend if query too many
var legend = !_.isUndefined(ARGS.legend) ? ARGS.legend : ( dashboard.services.query.ids.length > 5 ? false : true );

// Limit min auto interval
var auto_int = true;
var interval;
var from = ARGS.from||_d_timespan;
var re = from.match(/(\d+)([hms])/);
if (re) {
  if ( (re[2] == 'h' && re[1] <= 1)
    || (re[2] == 'm' && re[1] <= 60)
    || (re[2] == 's' && re[1] <= 3600) ) {
    auto_int = false;
    interval = '1m';
  }
}

// And a histogram that allows the user to specify the interval and time field
var rowidx = 0;
dashboard.rows[rowidx].panels = [
  {
    title: 'events over time',
    type: 'histogram',
    time_field: ARGS.timefield||"@timestamp",
    bars: false,
    lines: true,
    fill: 2,
    legend: legend,
    zerofill: false,
    span: 8
  },
  {
    title: 'Host',
    field: 'host_facet',
    type: 'terms',
    legend: legend,
    chart: 'table',
    missing: false,
    span: 2
  },
  {
    title: 'TAGS',
    field: 'tags',
    type: 'terms',
    legend: legend,
    chart: 'table',
    missing: false,
    span: 2
  },
  {
    title: 'sys load',
    value_field: 'sys_load_1',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    span: 4
  },
  {
    title: 'disk rest',
    value_field: 'disk_avail',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'min',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    y_format: 'bytes',
    span: 4
  },
  {
    title: 'run proc',
    value_field: 'running_process',
    type: 'histogram',
    legend: legend,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    span: 4
  },
  {
    title: 'network',
    type: 'column',
    span: 4,
    panels: [
  {
    title: 'tx byte',
    value_field: 'tx_byte',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    y_format: 'bytes',
    derivative: true,
    scaleSeconds: true,
    span: 4
  },
  {
    title: 'rx byte',
    value_field: 'rx_byte',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    y_format: 'bytes',
    derivative: true,
    scaleSeconds: true,
    span: 4
  }
    ]
  },
  {
    title: 'disk',
    type: 'column',
    span: 4,
    panels: [
  {
    title: 'read',
    value_field: 'disk_read_count',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    derivative: true,
    scaleSeconds: true,
    span: 4
  },
  {
    title: 'write',
    value_field: 'disk_write_count',
    type: 'histogram',
    legend: legend,
    auto_int: auto_int,
    interval: interval,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'max',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    derivative: true,
    scaleSeconds: true,
    span: 4
  }
    ]
  },
  {
    title: 'memory',
    type: 'column',
    span: 4,
    panels: [
  {
    title: 'mem free',
    value_field: 'mem_free',
    type: 'histogram',
    legend: legend,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'min',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    y_format: 'bytes',
    span: 4
  },
  {
    title: 'mem swap free',
    value_field: 'mem_swap_free',
    type: 'histogram',
    legend: legend,
    time_field: ARGS.timefield||"@timestamp",
    mode: 'min',
    bars: false,
    lines: true,
    stack: false,
    zerofill: false,
    y_format: 'bytes',
    span: 4
  }
    ]
  }
];

// And a table row where you can specify field and sort order
rowidx++;
dashboard.rows[rowidx].panels = [
  {
    title: 'all events',
    type: 'table',
    fields: !_.isUndefined(ARGS.fields) ? ARGS.fields.split(',') : ['@timestamp','host','_type','message'],
    sort: !_.isUndefined(ARGS.sort) ? ARGS.sort.split(',') : [ARGS.timefield||'@timestamp','desc'],
    field_list: false,
    size: 10,
    pages: 200,
    span: 12
  }
];

// Now return the object and we're good!
return dashboard;
