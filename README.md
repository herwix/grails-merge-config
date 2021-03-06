# Merge Config Grails Plugin

This plugin gives you the ability to manage your configuration located in Config.groovy or another configuration file in your application without requiring the application to be restarted. It also has a full web interface for managing your configuration.

## Dependencies

You'll need the following plugins installed in your application:

* [jQuery](http://grails.org/plugin/jquery)

The administration page uses the Bootstrap layout for styling, but it is not required to use the page.

## Installation

Install the plugin by adding the following to the plugins section of your `Config.groovy` file:

```groovy
compile ":merge-config:0.1.1"
```

Then in your application, navigate to the `configuration/index` controller action (the URI should be `/your-application-name/configuration`) to see the Configuration Management page.

### Schema Creation

If you do not use the `create`, `create-drop`, or `update` `dbCreate` options in your `DataSource.groovy` file, or you use the [Grails Database Migration Plugin](http://grails.org/plugin/database-migration), then you need to manually create the table to store your Configuration. Otherwise, __you do not need to perform either of these__.

The following are the Grails migration and SQL queries required to do so:

Grails migration:

```groovy
databaseChangeLog = {

  changeSet(author: "Your Name", id: "create-configuration-table") {
    createTable(tableName: "configuration") {
	  column(autoIncrement: "true", name: "id", type: "bigint") {
	    constraints(nullable: "false", primaryKey: "true", primaryKeyName: "configurationPK")
	  }

      column(name: "version", type: "bigint") {
        constraints(nullable: "false")
      }

      column(name: "description", type: "varchar(255)")

      column(name: "key_name", type: "varchar(255)") {
        constraints(nullable: "false")
      }

      column(name: "type", type: "varchar(255)") {
        constraints(nullable: "false")
      }

      column(name: "value", type: "varchar(255)") {
        constraints(nullable: "false")
      }
    }
  }

  changeSet(author: "Your Name", id: "create-unique-constraint-for-configuration-key") {
    createIndex(indexName: "key_uniq_1410639538043", tableName: "configuration", unique: "true") {
      column(name: "key")
    }
  }
}
```

SQL (somewhat generic)

```sql
drop table configuration if exists;

create table configuration (
    id int not null auto_increment primary key,
    version int not null,
    description varchar(255),
    key_name varchar(255) not null,
    type varchar(255) not null,
    value varchar(255) not null,
    primary key (id)
);

alter table configuration
    add constraint UK_5wejhym1uspe4klluscbwo9r  unique (key);
```

## Usage

### Setting Configuration

You can override your configuration options by adding the __key__, __value__, and __type__ of your configuration item on the Configuration Management page.

For example, if you have the following in your `Config.groovy`:

```groovy
application {
    option {
        foo = "bar"
    }
}

// or
application.option.foo = "bar"
```

Then you can add the `application.option.foo` key to your Configuration in the application and override this at any time.

If you delete the key from the management page, then the value from your configuration file will then be set back.

### Retrieving Configuration

If you need to retrieve any configuration item in your application, you can get it from your `grailsApplication` instance:

```groovy
grailsApplication.config.application.option.foo // => "updated-value"
```

### Editing the Management Page

If you'd like to customize the management page, you can copy the [`grails-app/views/configuration/index.gsp`](https://github.com/caseyscarborough/grails-merge-config/blob/master/grails-app/views/configuration/index.gsp) page into your application at the same location, then feel free to edit as you wish.
