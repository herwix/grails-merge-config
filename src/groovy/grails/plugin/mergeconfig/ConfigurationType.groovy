package grails.plugin.mergeconfig

public enum ConfigurationType {

  STRING("String", "java.lang.String"),
  BOOLEAN("Boolean", "java.lang.Boolean"),
  INTEGER("Integer", "java.lang.Integer"),
  DOUBLE("Double", "java.lang.Double"),
  LIST("List", "java.util.List")

  private final String simpleName
  private final String fullName

  public ConfigurationType(String simpleName, String fullName) {
    this.simpleName = simpleName
    this.fullName = fullName
  }

  public String getSimpleName() {
    simpleName
  }

  public String getFullName() {
    fullName
  }

  public Map toMap() {
    def type = [
        name: toString(),
        simpleName: simpleName,
        fullName: fullName
    ]
    return type
  }
}